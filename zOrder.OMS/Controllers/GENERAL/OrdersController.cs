using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;
using zOrder.OMS.Helper;
using zOrder.OMS.Models;

namespace zOrder.OMS.Controllers.GENERAL
{
    public class OrdersController : ApiController
    {
        #region ViewModel
        public class OrderData
        {
            public Orders order { get; set; }
            public List<OrderDetail> orderDetail { get; set; }
        }

        public class OrderViewModel
        {
            public int Order_Id { get; set; }
            public string CustomerName { get; set; }
            public string PhoneNumber { get; set; }
            public string Debt { get; set; }
            public string Addition { get; set; }
            public Nullable<System.DateTime> OrderDate { get; set; }
            public Nullable<int> CreatedUser { get; set; }
            public Nullable<System.DateTime> CreatedDate { get; set; }
            public Nullable<bool> IsPaid { get; set; }
            public Nullable<bool> IsDelivered { get; set; }
            public Nullable<bool> IsDeleted { get; set; }
            public Nullable<int> Discount { get; set; }

        }

        public class OrderDetailViewModel
        {
            public int OrderDetail_Id { get; set; }
            public Nullable<int> Order_Id { get; set; }
            public Nullable<int> Operation_Id { get; set; }
            public string Operation_Text { get; set; }
            public Nullable<int> Quantity { get; set; }
            public Nullable<decimal> Price { get; set; }
            public Nullable<decimal> TotalPrice { get; set; }

        }

        #endregion

        // LIST: api/Orders
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
                    var dataQuery = db.vOrders.OrderByDescending(x => x.Order_Id).Where(x => 1 == 1);

                    #region "Filter"
                    //if (filter != null)
                    //{
                    //    if (!string.IsNullOrEmpty(filter.Name)) dataQuery = dataQuery.Where(x => x.Name.Contains(filter.Name));
                    //    if (filter.IsActive.HasValue) dataQuery = dataQuery.Where(x=>x.IsActive == filter.IsActive.Value);
                    //}
                    #endregion

                    rowCount = dataQuery.Count();

                    var data = dataQuery.ToList();

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

        //[Route("api/Orders/Detail/{id}")]
        [HttpGet, HttpPost]
        [ActionName("Detail")]
        public JsonResult<ReturnValue> Detail(int id)
        {
            ReturnValue ret = new ReturnValue();
            OrderData detail = null;

            try
            {
                ret.success = false;
                //Shared.CheckSession();
                bool isExport = false;

                //var query = "";
                //var filter = new Products();


                using (var db = new zOrderEntities())
                {
                    OrderViewModel order = new OrderViewModel();
                    List<OrderDetailViewModel> orderdetail = new List<OrderDetailViewModel>();

                    order = db.Orders.Where(x => x.Order_Id == id).Select(x => new OrderViewModel
                    {
                        Order_Id = x.Order_Id,
                        OrderDate = x.OrderDate,
                        PhoneNumber = x.PhoneNumber,
                        Addition = x.Addition,
                        CreatedDate = x.CreatedDate,
                        CustomerName = x.CustomerName,
                        CreatedUser = x.CreatedUser,
                        Debt = x.Debt,
                        Discount = x.Discount,
                        IsDeleted = x.IsDeleted,
                        IsDelivered = x.IsDelivered,
                        IsPaid = x.IsPaid
                    }).First();

                    orderdetail = db.OrderDetail.Where(x => x.Order_Id == id).Select(x => new OrderDetailViewModel
                    {
                        OrderDetail_Id = x.OrderDetail_Id,
                        Order_Id = x.Order_Id,
                        Operation_Id = x.Operation_Id,
                        Operation_Text = db.Operations.Where(z => z.Operation_Id == x.Operation_Id).FirstOrDefault().Name,
                        Price = x.Price,
                        Quantity = x.Quantity,
                        TotalPrice = x.TotalPrice
                    }).ToList();

                    ret.retObject = new { order, orderdetail };

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

        //[Route("api/Orders/Save/{orders}")]
        [HttpGet, HttpPost]
        [ActionName("Save")]
        public JsonResult<ReturnValue> Save(OrderData od)
        {
            ReturnValue ret = new ReturnValue();
            try
            {
                ret.success = false;
                //using ( ts = new TransactionScope())
                //{
                using (zOrderEntities db = new zOrderEntities())
                {

                    Orders nd = null;
                    if (od.order.Order_Id.Equals(0))
                    {
                        nd = new Orders();
                        nd.CreatedUser = 1;
                        nd.CreatedDate = DateTime.Now;
                    }
                    else
                    {
                        var rd = db.Orders.Where(x => x.Order_Id.Equals(od.order.Order_Id)).ToList();
                        if (rd.Count > 0) nd = rd.First();
                    }
                    //nd.Updated_Date = DateTime.Now;
                    //nd.Updated_User = usr.uid;

                    nd.Order_Id = od.order.Order_Id;
                    nd.CustomerName = od.order.CustomerName.ToUpper();
                    nd.PhoneNumber = od.order.PhoneNumber;
                    nd.Debt = od.order.Debt;
                    nd.Addition = od.order.Addition;
                    nd.OrderDate = od.order.OrderDate;
                    nd.IsDeleted = false;
                    nd.IsDelivered = od.order.IsDelivered;
                    nd.IsPaid = od.order.IsPaid;
                    nd.Discount = od.order.Discount;

                    if (od.order.Order_Id.Equals(0))
                        db.Orders.Add(nd);
                    db.SaveChanges();

                    db.OrderDetail.RemoveRange(db.OrderDetail.Where(x => x.Order_Id == od.order.Order_Id).ToList());
                    db.SaveChanges();

                    foreach (var item in od.orderDetail)
                    {
                        OrderDetail md = new OrderDetail();
                        md.Order_Id = nd.Order_Id;
                        md.Operation_Id = item.Operation_Id;
                        md.Quantity = item.Quantity;
                        md.Price = item.Price;
                        md.TotalPrice = item.TotalPrice;
                        db.OrderDetail.Add(md);
                    }
                    db.SaveChanges();

                    
                    ret.retObject = od;
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

        //[Route("api/Orders/Delete/{id}")]
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
                    //Orders nd = null;

                    var rd = db.Orders.Where(x => x.Order_Id == id).First();
                    rd.IsDeleted = true; // silme işlemi

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

        // LIST: api/ProductList
        [HttpGet, HttpPost]
        [ActionName("ProductList")]
        public JsonResult<ReturnValue> ProductList()
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
                    var dataQuery = db.Products.OrderBy(x => x.Product_Id).Where(x => x.IsActive == true);

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

        // LIST: api/OperationList
        [HttpGet, HttpPost]
        [ActionName("OperationList")]
        public JsonResult<ReturnValue> OperationList(int id)
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
                    var dataQuery = db.Operations.OrderBy(x => x.Operation_Id).Where(x => 1 == 1);

                    if (id == null)
                        dataQuery = dataQuery.Where(x => x.IsActive == true);
                    else
                        dataQuery = dataQuery.Where(x => x.Product_Id == id && x.IsActive == true);

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
                            Operation_Id = x.Operation_Id,
                            Name = x.Name,
                            Price = x.Price,
                            IsActive = x.IsActive,
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

        // LIST: api/PriceList
        [HttpGet, HttpPost]
        [ActionName("PriceList")]
        public JsonResult<ReturnValue> PriceList(int id)
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
                    var dataQuery = db.Operations.OrderBy(x => x.Operation_Id).Where(x => 1 == 1);

                    if (id == null)
                        dataQuery = dataQuery.Where(x => x.IsActive == true);
                    else
                        dataQuery = dataQuery.Where(x => x.Operation_Id == id && x.IsActive == true);

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
                            Operation_Id = x.Operation_Id,
                            Name = x.Name,
                            Price = x.Price,
                            IsActive = x.IsActive,
                        }).FirstOrDefault();

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
