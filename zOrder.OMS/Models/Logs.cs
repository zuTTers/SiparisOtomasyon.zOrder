//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace zOrder.OMS.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Logs
    {
        public int Log_Id { get; set; }
        public string MethodName { get; set; }
        public string ExMessage { get; set; }
        public string Message { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedUser { get; set; }
    }
}
