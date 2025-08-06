
        document.addEventListener('DOMContentLoaded', function () {
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebar-overlay');
            const sidebarClose = document.getElementById('sidebar-close');

            function openSidebar() {
                sidebar.classList.add('active');
                sidebarOverlay.style.display = 'block';
                sidebarOverlay.classList.add('active');
                sidebarToggle.classList.add('hidden');
                document.body.style.overflow = 'hidden';
            }

            function closeSidebar() {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                sidebarToggle.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    sidebarOverlay.style.display = 'none';
                }, 300);
            }

            sidebarToggle.addEventListener('click', openSidebar);
            sidebarClose.addEventListener('click', closeSidebar);
            sidebarOverlay.addEventListener('click', closeSidebar);

            // Close sidebar on escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                    closeSidebar();
                }
            });

            // Close sidebar when screen size changes to desktop
            window.addEventListener('resize', function () {
                if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
                    closeSidebar();
                }
            });
        });
    