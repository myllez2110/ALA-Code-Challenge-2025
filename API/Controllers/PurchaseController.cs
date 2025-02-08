using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    public class PurchaseController : BaseController<PurchaseInsert, PurchaseUpdate>
    {
        private readonly PurchaseService _service;

        public PurchaseController()
        {
            _service = new PurchaseService();
        }

        public override IActionResult Create(PurchaseInsert obj)
        {
            try
            {
                int inserted = _service.Insert(obj);
                return inserted == 0 ? Problem("Object not inserted") : Created("Success", obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "admin")]
        public override IActionResult Read()
        {
            try
            {
                var purchases = _service.GetAll();
                return purchases.Count == 0 ? NotFound() : Ok(purchases);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public override IActionResult Read(long id)
        {
            try
            {
                if (id <= 0) return BadRequest();
                var purchase = _service.GetById(id);
                return purchase.id == -1 ? NotFound() : Ok(purchase);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUserPurchases(long userId)
        {
            try
            {
                var purchases = _service.GetUserPurchases(userId);
                return purchases.Count == 0 ? NotFound() : Ok(purchases);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "admin")]
        public override IActionResult UpdateById(PurchaseUpdate obj)
        {
            try
            {
                int updated = _service.Update(obj);
                return updated == 0 ? Problem($"Object {obj.id} not updated") : Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "admin")]
        public override IActionResult DeleteById(long id)
        {
            try
            {
                int deleted = _service.Delete(id);
                return deleted == 0 ? Problem($"Object {id} not deleted") : Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}