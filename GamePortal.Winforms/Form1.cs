using Microsoft.AspNetCore.Components.WebView.WindowsForms;
using Microsoft.Extensions.DependencyInjection;
using System.Windows.Forms;

namespace GamePortal.Winforms
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            var services = new ServiceCollection();

            services.AddWindowsFormsBlazorWebView();

#if DEBUG
            services.AddBlazorWebViewDeveloperTools();
#endif

            blazorWebView1.HostPage = "wwwroot\\Root.html";
            blazorWebView1.Services = services.BuildServiceProvider();
            blazorWebView1.RootComponents.Add<Main>("#application");
        }
    }
}