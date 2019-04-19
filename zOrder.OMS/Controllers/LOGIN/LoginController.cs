using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using zOrder.OMS.Models;
using zOrder.OMS.Helper;
using System.Web.Http.Results;
using RestSharp;
using RestSharp.Authenticators;
using System.Web;

namespace zOrder.OMS.Controllers
{
    public class LoginController : ApiController
    {


        // GET: api/Login
        [HttpGet, HttpPost]
        [ActionName("userAuthentication")]
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

        private string twitter_consumer_key = "***********"; //api key
        private string twitter_consumer_secret = "**********************"; //secret key

        public string GetRequestToken(string key, string secret, string callBackUrl)
        {
            var client = new RestClient("https://api.twitter.com");
            client.Authenticator = OAuth1Authenticator.ForRequestToken(key, secret, callBackUrl);

            var request = new RestRequest("/oauth/request_token", Method.POST);
            var response = client.Execute(request);

            var qs = HttpUtility.ParseQueryString(response.Content);

            string oauthToken = qs["oauth_token"];
            string oauthTokenSecret = qs["oauth_token_secret"];

            request = new RestRequest("oauth/authorize?oauth_token=" + oauthToken);

            string url = client.BuildUri(request).ToString();
            return url;
        }

        [HttpGet, HttpPost]
        [ActionName("TwitterAuth")]
        public JsonResult<ReturnValue> TwitterAuth()
        {
            ReturnValue ret = new ReturnValue();

            try
            {
                var url = GetRequestToken(twitter_consumer_key, twitter_consumer_secret, "https://127.0.0.1");

                ret.retObject = url;
                ret.success = true;
                ret.message = "Twitter";
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
