using GamePortal.Manage;

namespace GamePortal;

public partial class App : Application
{
    public App()
    {
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
