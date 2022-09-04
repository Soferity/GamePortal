using GamePortal.Winforms.Manage;
using System;
using System.Windows.Forms;
using Taiizor.Essentials.Maui.Cross;
using Taiizor.Essentials.Maui.Services;

namespace GamePortal.Winforms
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        private static void Main()
        {
            try
            {
                AppCenterService.Engine(General.Keys);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message + "\n\n" + ex.StackTrace);
            }

            CrossException.UnhandledException += (sender, args) =>
            {
                AppCenterService.Exception(args);
            };

            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }
    }
}