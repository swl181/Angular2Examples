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

        public class DomNode
        {
            public string tag { get; set; }
            public string text { get; set; }
            public Dictionary<string, string> attributes { get; set; }
            public List<DomNode> content { get; set; }
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

        public class TreeNode
        {
            public long id { get; set; }
            public string label { get; set; }
            public bool isLeaf { get; set; }
            public List<TreeNode> children { get; set; }
        }

        [HttpGet("[action]")]
        public TreeNode[] Files(long? id)
        {
            //TreeNode[] nodes = new TreeNode[] {
            //    new TreeNode() {
            //        label = "node1",
            //        isLeaf =false,
            //        children = new List<TreeNode>() {
            //            new TreeNode() {
            //                label = "node1.1",
            //                isLeaf =true
            //            },
            //            new TreeNode() {
            //                label = "node1.2",
            //                isLeaf =true
            //            }
            //        }
            //    },
            //    new TreeNode()
            //    {
            //        label = "node2",
            //        isLeaf = true
            //    }
            //};

            var nodes = new List<TreeNode>();

            Random random = new Random();

            var boolRnd = new Random();

            for (int n = 0; n< random.Next(2, 15); n++ )
            {
                

                nodes.Add(new TreeNode()
                {
                    label = "node" + n.ToString(),
                    isLeaf = boolRnd.Next(100) < 20
                });
            }

            return nodes.ToArray();
        }
    }
}
