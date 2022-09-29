using Microsoft.AspNetCore.Components.WebView;

namespace GamePortal
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
            
            blazorWebView.UrlLoading += (sender, urlLoadingEventArgs) =>
            {
                if (urlLoadingEventArgs.Url.Host != "0.0.0.0")
                {
                    urlLoadingEventArgs.UrlLoadingStrategy = UrlLoadingStrategy.OpenInWebView;
                }
            };

            blazorWebView.BlazorWebViewInitializing += (sender, args) =>
            {
                args.EnvironmentOptions = new()
                {
                    AdditionalBrowserArguments = "--enable-features=enable-unsafe-webgpu",
                };
            };
        }
    }
}