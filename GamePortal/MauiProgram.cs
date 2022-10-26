﻿using GamePortal.Helper;
using GamePortal.Manage;
using Taiizor.Essentials.Maui.AppCenter.Extension;
using Taiizor.Essentials.Maui.AppCenter.Services;
using Taiizor.Essentials.Maui.Cross;
using Taiizor.Essentials.Maui.Enum;
using Taiizor.Essentials.Maui.Extension;
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

            builder.UseFullscreen();

            builder.Services.AddLocalization();

            builder.Services.AddMauiBlazorWebView();

            if (HelperBuild.GetBuild == BuildEnum.Develop)
            {
                builder.Services.AddBlazorWebViewDeveloperTools();
            }

            builder.Services.AddSingleton<IDialogService, DialogService>();

            builder.UseAppCenter(General.Keys, General.Watch);

            CrossException.UnhandledException += (sender, args) =>
            {
                AppCenterService.Exception(args);
            };

            //Taiizor.Essentials.Maui.Extension.Culture.Set("en-GB");

            return builder.Build();
        }
    }
}