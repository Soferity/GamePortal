using GamePortal.Manage;
using Microsoft.Maui.LifecycleEvents;
using System.Diagnostics;
using Taiizor.Essentials.Maui.AppCenter.Services;
using Taiizor.Essentials.Maui.Cross;
using Taiizor.Essentials.Maui.Interfaces;
using Taiizor.Essentials.Maui.Services;

namespace GamePortal;

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

        builder.Services.AddMauiBlazorWebView();

#if DEBUG
        builder.Services.AddBlazorWebViewDeveloperTools();
#endif

        builder.Services.AddSingleton<IDialogService, DialogService>();

        builder.ConfigureLifecycleEvents(events =>
        {

#if WINDOWS
            events.AddWindows(windows => windows
                   .OnActivated((window, args) => LogEvent("OnActivated"))
                   .OnClosed((window, args) => LogEvent("OnClosed")) //End
                   .OnLaunched((window, args) => LogEvent("OnLaunched"))
                   .OnLaunching((window, args) => AppCenter()) //Start //LogEvent("OnLaunching")
                   .OnWindowCreated((window) => LogEvent("OnWindowCreated"))
                   .OnResumed((window) => LogEvent("OnResumed"))
                   .OnVisibilityChanged((window, args) => LogEvent("OnVisibilityChanged")));
#elif ANDROID
            events.AddAndroid(android => android
                .OnActivityResult((activity, requestCode, resultCode, data) => LogEvent("OnActivityResult", requestCode.ToString()))
                .OnStart((activity) => LogEvent("OnStart"))
                .OnCreate((activity, bundle) => AppCenter()) //Start //LogEvent("OnCreate")
                .OnBackPressed((activity) => LogEvent("OnBackPressed"))
                .OnStop((activity) => LogEvent("OnStop"))); //End
#elif IOS || MACCATALYST
            events.AddiOS(ios => ios
                .OnActivated((app) => LogEvent("OnActivated"))
                .OnResignActivation((app) => LogEvent("OnResignActivation"))
                .DidEnterBackground((app) => LogEvent("DidEnterBackground"))
                .FinishedLaunching((app, dict) => LogEvent("FinishedLaunching", $"{dict}")) //Start
                .WillTerminate((app) => LogEvent("WillTerminate"))); //End
#endif

        });

        return builder.Build();
    }
    private static bool LogEvent(string eventName, string type = null)
    {
        Debug.WriteLine($"Lifecycle Event: {eventName}{(type == null ? string.Empty : $" ({type})")}");
        return true;
    }

    private static bool AppCenter()
    {
        AppCenterService.Engine(General.Keys);

        CrossException.UnhandledException += (sender, args) =>
        {
            AppCenterService.Exception(args);
        };

        Debug.WriteLine($"Lifecycle Event: AppCenter");

        return true;
    }
}