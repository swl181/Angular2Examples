using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
		
		[HttpGet("[action]")]
        public DomNode DomNodes()
        {
            var node = new DomNode()
            {
                tag = "div",
                content =
                                    new List<DomNode>()
                                        {
                                            new DomNode()
                                                {
                                                    tag = "span",
                                                    attributes = new Dictionary<string, string>() { { "style", "color: red" } },
                                                    content = new List<DomNode>() {new DomNode() {text = "Enter value:" } }
                                                },
                                            new DomNode()
                                                {
                                                    tag = "input",
                                                    attributes = new Dictionary<string, string>() { { "type", "text" }, { "value", "test" }, { "style", "color: green" } }
                                                }
                                        }
            };
            return node;
        }

        public class DomNode
        {
            public string tag { get; set; }
            public string text { get; set; }
            public Dictionary<string, string> attributes { get; set; }
            public List<DomNode> content { get; set; }
        }

    }
}
