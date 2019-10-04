"use strict";

const app = {};

app.login = {
	bootstrap() {
		document.getElementById("login-btn").addEventListener("click", () => {
			window.location = "/user-dashboard.html";
		});
	}
};

app.userDashboard = {
	bootstrap() {
		document
			.getElementById("add-project-btn")
			.addEventListener("click", async () => {
				const project = {
					title: document.getElementById("title").value,
					description: document.getElementById("description").value
				};

				if (!project.title) {
					alert("Project title is required!");
					return;
				}

				if (!project.description) {
					alert("Project description is required!");
					return;
				}

				try {
					const { data } = await axios({
						method: "post",
						url: "/add-project",
						data: project
					});

					app.userDashboard.getProjects();
				} catch (e) {
					alert(e.message);
				}
			});

		document
			.getElementById("search-btn")
			.addEventListener("click", () =>
				app.userDashboard.searchProjects()
			);

		app.userDashboard.getProjects();
	},

	async getProjects() {
		try {
			const { data } = await axios({
				method: "get",
				url: "projects"
			});

			let markup = "";

			for (let project of data) {
				markup += `
	    			<div class="card">
						<div class="card-content">
							<span class="card-title blue-text">${project.title}</span>
							<p>${project.description}</p>
						</div>
					</div>
				`;
			}

			document.getElementById("projects-container").innerHTML = markup;
		} catch (e) {
			alert(e.message);
		}
	},

	async searchProjects() {
		let searchString = document.getElementById("search").value;

		if (!searchString) {
			alert("A search string is required!");
			return;
		}

		try {
			const { data } = await axios({
				method: "get",
				url: "search",
				params: { searchString }
			});

			let markup = "";

			for (let project of data) {
				markup += `
	    			<div class="card">
						<div class="card-content">
							<span class="card-title blue-text">${project.title}</span>
							<p>${project.description}</p>
						</div>
					</div>
				`;
			}

			document.getElementById("projects-container").innerHTML = markup;
		} catch (e) {
			alert(e.message);
		}
	}
};

function loginMain() {
	app.login.bootstrap();
}

function userDashboardMain() {
	app.userDashboard.bootstrap();
}

function indexMain() {
	// alert("Hello, I am in index!");
}

function main() {
	document.body.style.backgroundImage = "url('/images/degree.jpg')";
	switch (window.location.pathname) {
		case "/login.html":
			loginMain();
			break;
		case "/user-dashboard.html":
			userDashboardMain();
			break;
		case "/":
			indexMain();
			break;
	}
}

window.onload = main;
