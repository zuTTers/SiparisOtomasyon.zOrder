using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using zOrder.OMS.Helper;
using zOrder.OMS.Models;


namespace zOrder.OMS.Controllers.GENERAL
{
    //[Route("api/[controller]/[action]")]
    public class ProductController : ApiController
    {
        // LIST: api/Product

        [HttpGet, HttpPost]
        [ActionName("List")]
        public JsonResult<ReturnValue> List()
        {
            ReturnValue ret = new ReturnValue();

            try
            {
                ret.success = false;
                //Shared.CheckSession();
                bool isExport = false;

                int rowCount = 0;
                //var query = "";
                //var filter = new Products();


                using (var db = new zOrderEntities())
                {
                    var dataQuery = db.Products.OrderBy(x => x.Product_Id).Where(x => 1 == 1);

                    #region "Filter"
                    //if (filter != null)
                    //{
                    //    if (!string.IsNullOrEmpty(filter.Name)) dataQuery = dataQuery.Where(x => x.Name.Contains(filter.Name));
                    //    if (filter.IsActive.HasValue) dataQuery = dataQuery.Where(x=>x.IsActive == filter.IsActive.Value);
                    //}
                    #endregion

                    rowCount = dataQuery.Count();

                    var data = dataQuery.ToList().Select(x =>
                        new
                        {
                            Product_Id = x.Product_Id,
                            Name = x.Name,
                            IsActive = x.IsActive,
                            PhotoUrl = x.PhotoUrl
                        }).ToList();

                    if (!isExport)
                    {
                        ret.retObject = data;
                    }
                    else
                    {
                        //export excel format
                    }
                }
                ret.success = true;
                ret.message = "Listelendi";
            }
            catch (Exception ex)
            {
                ret.success = false;
                ret.error = ex.Message;
            }

            return Json(ret);
        }

        //[Route("api/Product/Save/{product}")]
        [HttpGet, HttpPost]
        [ActionName("Save")]
        public JsonResult<ReturnValue> Save(Products product)
        {
            ReturnValue ret = new ReturnValue();
            try
            {
                ret.success = false;
                //using (TransactionScope ts = TransactionUtils.CreateTransactionScope())
                //{
                using (zOrderEntities db = new zOrderEntities())
                {

                    Products nd = null;
                    if (product.Product_Id.Equals(0))
                    {
                        nd = new Products();
                        //nd.Created_User = usr.uid;
                        //nd.Created_Date = DateTime.Now;
                    }
                    else
                    {
                        var rd = db.Products.Where(x => x.Product_Id.Equals(product.Product_Id)).ToList();
                        if (rd.Count > 0) nd = rd.First();
                    }
                    //nd.Updated_Date = DateTime.Now;
                    //nd.Updated_User = usr.uid;

                    nd.Product_Id = product.Product_Id;
                    nd.Name = product.Name;
                    nd.IsActive = product.IsActive;
                    nd.PhotoUrl = product.PhotoUrl;
                    if (product.Product_Id.Equals(0))
                        db.Products.Add(nd);

                    db.SaveChanges();
                    ret.message = "Kaydedildi";
                    ret.success = true;
                }
                //ts.Complete();
                //}
            }
            catch (Exception ex)
            {
                ret.success = false;
                ret.error = ex.Message;
                
            }
            return Json(ret);
        }

        //[Route("api/Product/Delete/{id}")]
        [HttpGet, HttpPost]
        [ActionName("Delete")]
        public JsonResult<ReturnValue> Delete(int id)
        {
            ReturnValue ret = new ReturnValue();
            try
            {
                ret.success = false;
                using (zOrderEntities db = new zOrderEntities())
                {
                    var at = db.Products.Where(x => x.Product_Id.Equals(id)).ToList();
                    if (at.Count > 0) db.Products.Remove(at.First());
                    db.SaveChanges();

                    ret.message = "Silindi";
                    ret.success = true;
                }
            }
            catch (Exception ex)
            {
                ret.success = false;
                ret.error = ex.Message;
            }
            return Json(ret);
        }

        //[Route("api/Product/Delete1")]
        [HttpGet, HttpPost]
        public IHttpActionResult Delete1(int id)
        {
            ReturnValue ret = new ReturnValue();
            try
            {
                ret.success = false;
                using (zOrderEntities db = new zOrderEntities())
                {
                    var at = db.Products.Where(x => x.Product_Id.Equals(id)).ToList();
                    if (at.Count > 0) db.Products.Remove(at.First());
                    db.SaveChanges();

                    ret.message = "Silindi";
                    ret.success = true;
                }
            }
            catch (Exception ex)
            {
                ret.success = false;
                ret.error = ex.Message;
            }
            return Json(ret);
        }
    }
}
