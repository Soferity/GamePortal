using Taiizor.Essentials.Maui.Value;
using Mutex = Taiizor.Essentials.Maui.Extension.Mutex;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace GamePortal.WinUI;

/// <summary>
/// Provides application-specific behavior to supplement the default Application class.
/// </summary>
public partial class App : MauiWinUIApplication
{
    /// <summary>
    /// Initializes the singleton application object.  This is the first line of authored code
    /// executed, and as such is the logical equivalent of main() or WinMain().
    /// </summary>
    public App()
    {
        Exception();

        InitializeComponent();
    }

    protected override MauiApp CreateMauiApp()
    {
        return Mutex.Check() ? MauiProgram.CreateMauiApp() : throw new Exception(External.MutexMessage);
    }

    private void Exception()
    {
        //AppDomain.CurrentDomain.FirstChanceException += ExceptionService.Set;

        //AppDomain.CurrentDomain.UnhandledException += ExceptionService.Set;

        //TaskScheduler.UnobservedTaskException += ExceptionService.Set;

    }
}