using GamePortal.Manage;
using Newtonsoft.Json;
using Taiizor.Essentials.Blazor.Enum;
using Taiizor.Essentials.Maui.AppCenter.Enum;

namespace GamePortal.Helper
{
    internal class HelperKey
    {
        public static string GetKey(AppEnum App)
        {
            string Config = string.Empty;

            string file = General.Assembly.GetManifestResourceNames()
                .Single(files => files.EndsWith(General.Config));

            using Stream stream = General.Assembly.GetManifestResourceStream(file);
            using StreamReader reader = new(stream);
            Config = reader.ReadToEnd();

            Configured Json = Configured.FromJson(Config);

            return HelperBuild.GetBuild switch
            {
                BuildEnum.Develop => App switch
                {
                    AppEnum.iOS => Json.Debug.iOS,
                    AppEnum.macOS => Json.Debug.macOS,
                    AppEnum.Android => Json.Debug.Android,
                    _ => Json.Debug.Windows,
                },
                _ => App switch
                {
                    AppEnum.iOS => Json.Release.iOS,
                    AppEnum.macOS => Json.Release.macOS,
                    AppEnum.Android => Json.Release.Android,
                    _ => Json.Release.Windows,
                },
            };
        }

        private partial class Configured
        {
            [JsonProperty("Debug")]
            public App Debug { get; set; }

            [JsonProperty("Release")]
            public App Release { get; set; }
        }

        private partial class App
        {
            [JsonProperty("iOS")]
            public string iOS { get; set; }

            [JsonProperty("macOS")]
            public string macOS { get; set; }

            [JsonProperty("Android")]
            public string Android { get; set; }

            [JsonProperty("Windows")]
            public string Windows { get; set; }
        }

        private partial class Configured
        {
            public static Configured FromJson(string Json)
            {
                return JsonConvert.DeserializeObject<Configured>(Json);
            }
        }
    }
}