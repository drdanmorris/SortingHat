using CDrive.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CDrive.Controllers
{
    public class ClassController : ApiController
    {
        Class testClass = new Class() 
        { 
            Name = "ASBGees", 
            Pupils = "Daniel,Paul,Ben,Gurpreet,Sonya,Rhys,Yini,Andy,Kawai,Luke,Natalia,Patrick,Puja,Ragha,Shyarmal,Harshila" 
        };

        public IEnumerable<Class> Get()
        {
            var classes = new List<Class>();
            classes.Add(testClass);
            return classes;
        }


        public Class Get(int id)
        {
            return testClass;
        }


    }
}
