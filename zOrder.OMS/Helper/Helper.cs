using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zOrder.OMS.Helper
{
    public class ReturnValue
    {
        public string error;        //Hata mesajı içeriği
        public string message;      //Server taraflı işlem sonu dönen mesaj içeriği
        public bool requiredLogin;  //Session kontrolü
        public object retObject;    //İşlem sonu dönen data objesi
        public bool success;        //İşlem başarı kontrolü

        public ReturnValue() { }
    }

    public class query
    {
        public string filter { get; set; }
        public string limit { get; set; }
        public string order { get; set; }
        public int page { get; set; }
        public int count { get; set; }
    }


    public static class Shared
    {
        //Oturum kontrolu yapar.
        public static bool CheckSession()
        {
            if (HttpContext.Current.Session["UserId"] == null)
            {
                return false;
            }
            return true;
        }
    }
}