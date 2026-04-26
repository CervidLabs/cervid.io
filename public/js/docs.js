      // Tu código JavaScript de cliente va aquí
      const menuToggle = document.getElementById("menuToggle");
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("sidebarOverlay");

      function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      }

      function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }

      if (menuToggle) menuToggle.addEventListener("click", openSidebar);
      if (overlay) overlay.addEventListener("click", closeSidebar);

      const links = document.querySelectorAll(".sidebar-link");
      const pages = document.querySelectorAll(".page");

      function showPage(pageId) {
        pages.forEach((p) => p.classList.remove("active"));
        links.forEach((l) => l.classList.remove("active"));
        const page = document.getElementById("page-" + pageId);
        if (page) page.classList.add("active");
        const link = document.querySelector(`[data-page="${pageId}"]`);
        if (link) link.classList.add("active");
        history.replaceState(null, "", "#" + pageId);
        window.scrollTo(0, 0);
        if (window.innerWidth <= 860) closeSidebar();
      }

      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          showPage(link.dataset.page);
        });
      });

      const hash = window.location.hash.replace("#", "");
      if (hash && document.getElementById("page-" + hash)) {
        showPage(hash);
      } else {
        showPage("intro");
      }

      window.addEventListener("resize", () => {
        if (window.innerWidth > 860) closeSidebar();
      });