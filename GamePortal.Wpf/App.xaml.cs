using GamePortal.Wpf.Manage;
using System.Windows;
using Taiizor.Essentials.Maui.Cross;
using Taiizor.Essentials.Maui.Services;

namespace GamePortal.Wpf
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public App()
        {
            try
            {
                AppCenterService.Engine(General.Keys);
            }
            catch (System.Exception ex)
            {
                MessageBox.Show(ex.Message + "\n\n" + ex.StackTrace);
            }

            CrossException.UnhandledException += (sender, args) =>
            {
                AppCenterService.Exception(args);
            };

            InitializeComponent();
        }
    }
}