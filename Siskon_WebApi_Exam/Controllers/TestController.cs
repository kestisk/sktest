using Siskon_EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace Siskon_WebApi_Exam.Controllers
{
    public class TestController : ApiController
    {
     
        CoreProEntities db = new CoreProEntities();
      
        [HttpGet]
        public List<Class1> sk()
        {
            List<Class1> dol = new List<Class1>();
            var get = db.Makes.ToList();
            
                foreach(var item in get)
            {
                dol.Add(new Class1 { ID = item.Id, NAME = item.Name });
            }
       
            return dol;
        }
    }
}
