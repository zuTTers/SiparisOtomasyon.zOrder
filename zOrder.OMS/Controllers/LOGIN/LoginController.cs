using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using zOrder.OMS.Models;
using zOrder.OMS.Helper;
using System.Web.Http.Results;

namespace zOrder.OMS.Controllers
{
    public class LoginController : ApiController
    {


        // GET: api/Login
        [AcceptVerbs("GET", "POST")]
        public JsonResult<ReturnValue> userAuthentication(string username,string password)
        {
            ReturnValue ret = new ReturnValue();
            var token = Guid.NewGuid();

            using (var db = new zOrderEntities())
            {
                try
                {
                    var user = db.Users.Where(x => x.Mail == username && x.Password == password && x.IsDeleted == false)
                        .Select(x => new { Mail = x.Mail, Password = x.Password, IsDeleted = x.IsDeleted }).First();
                                    
                    if (user != null)
                    {
                        ret.retObject = new { token = token };
                        ret.success = true;
                        ret.message = "Giriş başarılı";
                    }
                    else
                    {
                        ret.success = false;
                        ret.message = "Giriş başarısız";
                    }

                }
                catch (Exception ex)
                {
                    ret.success = false;
                    ret.error = ex.ToString();
                }
            }
            return Json(ret);
        }

        
    }
}
