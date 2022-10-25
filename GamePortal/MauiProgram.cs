using GamePortal.Manage;
using Taiizor.Essentials.Maui.AppCenter.Extension;
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