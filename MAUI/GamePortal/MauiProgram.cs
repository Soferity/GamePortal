﻿using Microsoft.Maui.LifecycleEvents;
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

            // App Lifecycle Events

        });

        return builder.Build();
    }
}