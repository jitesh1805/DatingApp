using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message) {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Application-Control-Expose-Header", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime thisDateTime) {
            int age = DateTime.Today.Year - thisDateTime.Year;
            if(thisDateTime.AddYears(age) > DateTime.Today)
                age--;
                
            return age;
        }
        
    }
}