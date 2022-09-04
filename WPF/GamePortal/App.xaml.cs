using GamePortal.Manage;
using System.Threading.Tasks;
using System;
using System.Windows;
using Taiizor.Essentials.AppCenter.Services;

namespace GamePortal
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public App()
        {
            AppCenterService.Engine(General.Key);

            AppDomain.CurrentDomain.FirstChanceException += ExceptionService.Set;

            AppDomain.CurrentDomain.UnhandledException += ExceptionService.Set;

            TaskScheduler.UnobservedTaskException += ExceptionService.Set;
        }
    }
}