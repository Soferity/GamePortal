using GamePortal.Manage;
using System;
using System.Threading.Tasks;
using System.Windows.Forms;
using Taiizor.Essentials.AppCenter.Services;

namespace GamePortal
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        private static void Main()
        {
            AppCenterService.Engine(General.Key);

            AppDomain.CurrentDomain.FirstChanceException += ExceptionService.Set;

            AppDomain.CurrentDomain.UnhandledException += ExceptionService.Set;

            TaskScheduler.UnobservedTaskException += ExceptionService.Set;

            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainPage());
        }
    }
}