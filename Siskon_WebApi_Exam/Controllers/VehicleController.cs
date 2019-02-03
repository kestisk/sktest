using Siskon_EF;
using Vehicle.Common.VehicleDT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Siskon_WebApi_Exam.Controllers
{
    public class VehicleController : ApiController
    {
        SiskonEntities2 db = new SiskonEntities2();
        [HttpGet]
        public List<VehicleDTO> GetVehicle()
        {
            List<VehicleDTO> dol = new List<VehicleDTO>();
            var get = db.Vehicles.ToList();

            foreach (var item in get)
            {
                dol.Add(new VehicleDTO
                {
                    Plate = item.Plate,
                    Nickname = item.Nickname,
                    Brand = item.Brand,
                    Model = item.Model,
                    Year = item.Year,
                    Type = item.Type,
                    Color=item.Color,
                    Id = item.Id
                });
            }

            return dol;
        }
        [HttpPost]
        public void Save(VehicleDTO vehicle)
        {
            validateInput(vehicle);

            var control = db.Vehicles.Where(x => x.Plate == vehicle.Plate).SingleOrDefault();
            if (control==null)
            {
                Siskon_EF.Vehicle newItem = new Siskon_EF.Vehicle
                {
                    Plate = vehicle.Plate,
                    Nickname = vehicle.Nickname,
                    Brand = vehicle.Brand,
                    Model = vehicle.Model,
                    Year = vehicle.Year,
                    Type = vehicle.Type,
                    Color = vehicle.Color,
                    IsActive = true,
                };
                db.Vehicles.Add(newItem);
                db.SaveChanges();
            }
            else
            {

                control.Plate = vehicle.Plate;
                control.Nickname = vehicle.Nickname;
                control.Brand = vehicle.Brand;
                control.Model = vehicle.Model;
                control.Year = vehicle.Year;
                control.Type = vehicle.Type;
                control.Color = vehicle.Color;
                control.IsActive = true;
           
                db.SaveChanges();
            }
        }

        private void validateInput(VehicleDTO vehicle)
        {
            string Platefirsttwo = vehicle.Plate;
            if (Platefirsttwo[0] < 48 || Platefirsttwo[0] > 57)
            {
                throw new ArgumentNullException("Plate", "Plate must be standart");
            }
            if (Platefirsttwo[1] < 48 || Platefirsttwo[1] > 57)
            {
                throw new ArgumentNullException("Plate", "Plate must be standart");
            }
            if (Platefirsttwo[2] > 48 && Platefirsttwo[2] < 57)
            {
                throw new ArgumentNullException("Plate", "Plate must be standart");
            }
            if (Platefirsttwo[Platefirsttwo.Length-1] <48 || Platefirsttwo[Platefirsttwo.Length - 1] > 57)
            {
                throw new ArgumentNullException("Plate", "Plate must be standart");
            }
            if (vehicle == null)
                throw new ArgumentNullException("vehicle", "Vehicle must be fill");
           if (vehicle.Nickname == null)
                throw new ArgumentNullException("Nickname", "Nickname must be fill");
            if (vehicle.Plate == null)
                throw new ArgumentNullException("Plate", "Plate must be fill");
            if (vehicle.Brand == null)
                throw new ArgumentNullException("Brand", "Brand must be fill");
            if (vehicle.Model == null)
                throw new ArgumentNullException("Model", "Model must be fill");
            if (vehicle.Year == null)
                throw new ArgumentNullException("Year", "Year must be fill");
            if (vehicle.Type == null)
                throw new ArgumentNullException("Type", "Type must be fill");
            if (vehicle.Color == null)
                throw new ArgumentNullException("Color", "Color must be fill");
        }

        [HttpPost]
        public void Delete(VehicleDTO itemToDelete) {

            Siskon_EF.Vehicle del = db.Vehicles.Where(x => x.Id == itemToDelete.Id).SingleOrDefault();
            db.Vehicles.Remove(del);
            db.SaveChanges();

        }
        [HttpPost]
        public List<VehicleDTO> UpdateVehicle(VehicleDTO itemToUpdate)
        {
            Siskon_EF.Vehicle upd = db.Vehicles.Where(x => x.Id == itemToUpdate.Id).SingleOrDefault();
            List<VehicleDTO> dol = new List<VehicleDTO>();
            var get = db.Vehicles.ToList();

           
                dol.Add(new VehicleDTO
                {
                    Plate = upd.Plate,
                    Nickname = upd.Nickname,
                    Brand = upd.Brand,
                    Model = upd.Model,
                    Year = upd.Year,
                    Type = upd.Type,
                    Color = upd.Color,
                    Id = upd.Id
                });
            

            return dol;
        }
    }
}
