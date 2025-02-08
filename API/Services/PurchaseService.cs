using API.Models;
using API.Repositories;

namespace API.Services
{
    public class PurchaseService
    {
        private readonly PurchaseRepository _repository;

        public PurchaseService()
        {
            _repository = new PurchaseRepository();
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

        public dynamic Insert(PurchaseInsert obj)
        {
            if (obj.userID <= 0) throw new Exception("User ID can't be null");
            if (obj.total <= 0) throw new Exception("Total must be greater than 0");
            return _repository.Insert(obj);
        }

        public dynamic Update(PurchaseUpdate obj)
        {
            if (obj.id <= 0) throw new Exception("Id can't be null");
            if (obj.userID <= 0) throw new Exception("User ID can't be null");
            if (obj.total <= 0) throw new Exception("Total must be greater than 0");
            
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

        public List<dynamic> GetUserPurchases(long userId)
        {
            if (userId <= 0) throw new Exception("User ID can't be null");
            return _repository.SelectByUserId(userId);
        }
    }
}