using API_Forum.Models;
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
    public class DiscussionRepository : GeneralRepository<Discussion, int>
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly string request;

        public DiscussionRepository(Address address, string request = "Discussions/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
        }

        public HttpStatusCode Discussion(Discussion entity)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(address.link + request, content).Result;
            return result.StatusCode;
        }

        public HttpStatusCode DeleteDis(int id)
        {
            var result = httpClient.DeleteAsync(address.link + request + "Delete/" + id).Result;
            return result.StatusCode;
        }
    }
}
