using GamePortal.Manage;
using Microsoft.Maui.LifecycleEvents;
using System.Diagnostics;
using Taiizor.Essentials.Maui.AppCenter.Services;
using Taiizor.Essentials.Maui.Cross;
using Taiizor.Essentials.Maui.Interfaces;
using Taiizor.Essentials.Maui.Services;

namespace GamePortal
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            MauiAppBuilder builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                });

            builder.Services.AddLocalization();

            builder.Services.AddMauiBlazorWebView();

#if DEBUG
            builder.Services.AddBlazorWebViewDeveloperTools();
#endif

            builder.Services.AddSingleton<IDialogService, DialogService>();

            builder.ConfigureLifecycleEvents(events =>
            {

#if WINDOWS
			events.AddWindows(windows => windows
                .OnActivated((window, args) => LogEvent("OnActivated", $"{args}"))
                .OnClosed((window, args) => LogEvent("OnClosed", $"{args}")) //End
                .OnLaunched((window, args) => LogEvent("OnLaunched", $"{args}"))
                .OnLaunching((window, args) => AppCenter()) //Start //LogEvent("OnLaunching", $"{args}")
                .OnWindowCreated((window) => LogEvent("OnWindowCreated"))
                .OnResumed((window) => LogEvent("OnResumed"))
                .OnVisibilityChanged((window, args) => LogEvent("OnVisibilityChanged", $"{args}")));
#elif ANDROID
            events.AddAndroid(android => android
                .OnActivityResult((activity, requestCode, resultCode, data) => LogEvent("OnActivityResult", $"{requestCode}, {resultCode}, {data}"))
                .OnStart((activity) => LogEvent("OnStart"))
                .OnCreate((activity, bundle) => AppCenter()) //Start //LogEvent("OnCreate", $"{bundle}")
                .OnBackPressed((activity) => LogEvent("OnBackPressed"))
                .OnStop((activity) => LogEvent("OnStop"))); //End
#elif IOS || MACCATALYST
            events.AddiOS(ios => ios
                .OnActivated((app) => LogEvent("OnActivated"))
                .OnResignActivation((app) => LogEvent("OnResignActivation"))
                .DidEnterBackground((app) => LogEvent("DidEnterBackground"))
                .FinishedLaunching((app, dict) => AppCenter()) //Start //LogEvent("FinishedLaunching", $"{dict}")
                .WillTerminate((app) => LogEvent("WillTerminate"))); //End
#endif

            });

            //Taiizor.Essentials.Maui.Extension.Culture.Set("en-GB");

            return builder.Build();
        }

        private static bool LogEvent(string eventName, string type = null)
        {
            Debug.WriteLine($"Lifecycle Event: {eventName}{(type == null ? string.Empty : $" ({type})")}");

            return true;
        }

        private static bool AppCenter()
        {
            AppCenterService.Engine(General.Keys, General.Watch);

            CrossException.UnhandledException += (sender, args) =>
            {
                AppCenterService.Exception(args);
            };

            Debug.WriteLine($"Lifecycle Event: AppCenter");

            return true;
        }
    }
}