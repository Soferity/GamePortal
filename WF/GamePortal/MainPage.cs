﻿using GamePortal.Public;
using Microsoft.AspNetCore.Components.WebView.WindowsForms;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Windows.Forms;
using Taiizor.Essentials.AppCenter.Services;

namespace GamePortal
{
    public partial class MainPage : Form
    {
        public MainPage()
        {
            InitializeComponent();

            ServiceCollection services = new();

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