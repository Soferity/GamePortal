using GamePortal.Manage;
using Taiizor.Essentials.Maui.Cross;
using Taiizor.Essentials.Maui.Services;

namespace GamePortal;

public partial class App : Application
{
    public App()
    {
        AppCenterService.Engine(General.Keys);

        CrossException.UnhandledException += (sender, args) =>
        {
            AppCenterService.Exception(args);
        };

        InitializeComponent();

        MainPage = new MainPage();
    }

    protected override Window CreateWindow(IActivationState activationState)
    {
        Window Window = base.CreateWindow(activationState);

        if (Window != null)
        {
            Window.Title = General.Title;
        }

        return Window;
    }
}
