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
    public class CustomerController : ApiController
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
                    var dataQuery = db.vCustomers.OrderBy(x => x.PhoneNumber).Where(x => 1 == 1);

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
                            Customer_Id = x.Customer_Id,
                            PhoneNumber = x.PhoneNumber,
                            Name = x.Name,
                            Mail = x.Mail,
                            Password = x.Password,
                            Address = x.Address,
                            Birthday = x.Birthday,
                            Gender = x.Gender,
                            IsActive = x.IsActive,
                            IsDeleted = x.IsDeleted
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

    }
}
