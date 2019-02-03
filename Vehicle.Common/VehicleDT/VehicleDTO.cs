using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vehicle.Common.VehicleDT
{
    public class VehicleDTO
    {
        public long Id { get; set; }
        public string Plate { get; set; }
        public string Nickname { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public string Type { get; set; }
        public string Color { get; set; }
        public bool IsActive { get; set; }
    }    
    
}
