using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace JQuery_ShowAge
{
    /// <summary>
    /// Summary description for DateTimeService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class DateTimeService : System.Web.Services.WebService
    {
        [WebMethod]
        public object DateNow()
        {
            return new { DateTime.Today.Year, Month = DateTime.Today.Month - 1, DateTime.Today.Day };
        }
        
        [WebMethod]
        public double DifferenceInYears(DateTime firstDate, DateTime secondDate)
        {
            return Math.Round((firstDate - secondDate).TotalDays / 365);
        }
    }
}
