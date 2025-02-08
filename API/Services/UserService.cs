using API.Models;
using API.Repositories;

namespace API.Services
{
    public class UserService
    {
        private readonly UserRepository _repository;
        private readonly TokenService _tokenService;

        public UserService(TokenService tokenService)
        {
            _repository = new UserRepository();
            _tokenService = tokenService;
        }

        public dynamic ValidateUser(UserLogin login)
        {
            var user = _repository.ValidateUser(login.user, login.password);
            if (user == null) throw new Exception("Invalid credentials");

            return new UserLoginResponse
            {
                role = user.role,
                name = user.name,
                token = _tokenService.CreateToken(user.name)
            };
        }

        public List<dynamic> GetAll()
        {
            return _repository.SelectAll();
        }

        public dynamic GetById(long id)
        {
            if (id <= 0) throw new Exception("Id can't be null");
            return _repository.SelectById(id);
        }

        public dynamic Insert(UserInsert obj)
        {
            if (string.IsNullOrEmpty(obj.email)) throw new Exception("Email can't be null");
            if (string.IsNullOrEmpty(obj.name)) throw new Exception("Name can't be null");
            if (string.IsNullOrEmpty(obj.password)) throw new Exception("Password can't be null");
            return _repository.Insert(obj);
        }

        public dynamic Update(UserUpdate obj)
        {
            if (obj.id <= 0) throw new Exception("Id can't be null");
            if (string.IsNullOrEmpty(obj.email)) throw new Exception("Email can't be null");
            if (string.IsNullOrEmpty(obj.name)) throw new Exception("Name can't be null");
            
            dynamic exists = _repository.SelectById(obj.id);
            int rows = 0;
            if (exists.id != -1) rows = _repository.UpdateById(obj);
            return rows;
        }

        public dynamic Delete(long id)
        {
            if (id <= 0) throw new Exception("Id can't be null");
            dynamic exists = _repository.SelectById(id);
            int rows = 0;
            if (exists.id != -1) rows = _repository.DeleteById(id);
            return rows;
        }
    }
}