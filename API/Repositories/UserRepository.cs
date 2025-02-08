using API.Core;
using API.Models;
using Microsoft.Data.Sqlite;

namespace API.Repositories
{
    public class UserRepository : IRepository<UserInsert, UserUpdate>
    {
        public string TABLE => "User";
        
        public dynamic SetAttributes(SqliteDataReader reader) => new User()
        {
            id = long.Parse(reader["id"].ToString()!),
            email = reader["email"].ToString()!,
            name = reader["name"].ToString()!,
            role = reader["role"]?.ToString() ?? "user"
        };

        public int Insert(UserInsert obj)
        {
            using DB db = new();
            db.NewCommand($"INSERT INTO {TABLE} (email, password, name, role) VALUES (@email, @password, @name, @role)");
            db.Parameter("@email", obj.email);
            db.Parameter("@password", Security.HashPassword(obj.password));
            db.Parameter("@name", obj.name);
            db.Parameter("@role", obj.role);
            return db.Execute();
        }

        public List<dynamic> SelectAll()
        {
            using DB db = new();
            db.NewCommand($"SELECT id, email, name, role FROM {TABLE}");
            List<dynamic> list = [];
            using SqliteDataReader reader = db.Execute();
            while (reader.Read())
            {
                list.Add(SetAttributes(reader));
            }
            return list;
        }

        public dynamic SelectById(long id)
        {
            using DB db = new();
            db.NewCommand($"SELECT id, email, name, role FROM {TABLE} WHERE id = @id");
            db.Parameter("@id", id);
            using SqliteDataReader reader = db.Execute();
            if (reader.Read()) return SetAttributes(reader);
            return new User();
        }

        public dynamic ValidateUser(string email, string password)
        {
            using DB db = new();
            db.NewCommand($"SELECT id, email, name, role, password FROM {TABLE} WHERE email = @email");
            db.Parameter("@email", email);
            using SqliteDataReader reader = db.Execute();
            if (reader.Read())
            {
                string storedHash = reader["password"].ToString()!;
                if (Security.VerifyPassword(password, storedHash))
                {
                    return new User
                    {
                        id = long.Parse(reader["id"].ToString()!),
                        email = reader["email"].ToString()!,
                        name = reader["name"].ToString()!,
                        role = reader["role"]?.ToString() ?? "user"
                    };
                }
            }
            return null;
        }

        public int UpdateById(UserUpdate obj)
        {
            using DB db = new();
            string sql = $"UPDATE {TABLE} SET email=@email, name=@name, role=@role";
            if (!string.IsNullOrEmpty(obj.password))
            {
                sql += ", password=@password";
            }
            sql += " WHERE id = @id";
            
            db.NewCommand(sql);
            db.Parameter("@id", obj.id);
            db.Parameter("@email", obj.email);
            db.Parameter("@name", obj.name);
            db.Parameter("@role", obj.role);
            if (!string.IsNullOrEmpty(obj.password))
            {
                db.Parameter("@password", Security.HashPassword(obj.password));
            }
            return db.Execute();
        }

        public int DeleteById(long id)
        {
            using DB db = new();
            db.NewCommand($"DELETE FROM {TABLE} WHERE id = @id");
            db.Parameter("@id", id);
            return db.Execute();
        }
    }
}