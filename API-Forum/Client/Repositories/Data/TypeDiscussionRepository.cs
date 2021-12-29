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
    public class TypeDiscussionRepository : GeneralRepository<TypeDiscussion, int>
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly string request;

        public TypeDiscussionRepository(Address address, string request = "TypeDiscussions/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
        }

        public HttpStatusCode TypeDiscussion(TypeDiscussion entity)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(address.link + request, content).Result;
            return result.StatusCode;
        }
    }
}
