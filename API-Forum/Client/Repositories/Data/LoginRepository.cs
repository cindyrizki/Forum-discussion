using API_Forum.ViewModel;
using Client.Base.Urls;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client.Repositories.Data
{
    public class LoginRepository : GeneralRepository<LoginVM, string>
    {
        private readonly Address address;
        private readonly string request;
        private readonly HttpClient httpClient;

        public LoginRepository(Address address, string request = "Users/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
        }

        public HttpStatusCode ResetPassword(LoginVM entity)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            var result = httpClient.PutAsync(address.link + request + "ResetPassword/", content).Result;
            return result.StatusCode;
        }

        public async Task<JWTokenVM> Login(LoginVM loginVM)
        {
            JWTokenVM token = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(loginVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "Login/", content);

            string apiResponse = await result.Content.ReadAsStringAsync();
            token = JsonConvert.DeserializeObject<JWTokenVM>(apiResponse);

            return token;
        }

    }
}
