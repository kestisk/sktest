using Siskon_EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Siskon_WebApi_Exam.Controllers
{
    
    public class PostskController : ApiController
    {
         
      
       CoreProEntities db = new CoreProEntities();
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost]
        public void sk()

        {
            int idm = 4;
            string namee = "make4";
            Make kayıt = new Make
            {
                Id = idm,
                Name = namee
            };
            db.Makes.Add(kayıt);
            db.SaveChanges();
        }
    }
   
}
