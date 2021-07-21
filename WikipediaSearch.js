let searchInputElem = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendSearchResult(result) {
	let{title,link,description} = result;

	//Creating Result Item Div Container -- result-item

	let resultItemEl = document.createElement('div');
	resultItemEl.classList.add('result-item');

	searchResultsEl.appendChild(resultItemEl);

	//Creating Title Elem Anchor elem -- result-title

	let resultTitleEl = document.createElement('a');
	resultTitleEl.classList.add('result-title');
	resultTitleEl.textContent = title;
	resultTitleEl.href = link;
	resultTitleEl.target = '_blank';

	resultItemEl.appendChild(resultTitleEl);

	//Creating Break Elem 

	let titleBreakEl = document.createElement('br');
	resultItemEl.appendChild(titleBreakEl);

	//Creating URL Elem Anchor elem -- result-url

	let urlEl = document.createElement('a');
	urlEl.classList.add('result-url');
	urlEl.href = link;
	urlEl.target = "_blank";
	urlEl.textContent = link;
	resultItemEl.appendChild(urlEl);

	//Creating Break Elem

	let linkBreakEl = document.createElement('br');
	resultItemEl.appendChild(linkBreakEl);

	//Creating Description Elem  -- line-description

	let descriptionEl = document.createElement('p');
	descriptionEl.classList.add('line-description');
	descriptionEl.textContent = description;
	resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults){
	spinnerEl.classList.toggle('d-none');
	for(let result of searchResults){
		createAndAppendSearchResult(result);
	}
	
}

function searchWikipedia(event) {
	if(event.key === 'Enter'){

		spinnerEl.classList.toggle('d-none');
		//Whenever user enters 'Enter' This means he doing new search
		//So make searchResultEl empty

		searchResultsEl.textContent = '';

		let searchInput = searchInputElem.value;
		//console.log(searchInput);

		let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

		//Request Configuration
		let options = {
			method: 'GET',
		}
		fetch(url,options)
		.then(function(response){
			return response.json();
		})
		.then(function(jsonData){
			let {search_results} = jsonData;
			displayResults(search_results);
		})
	}
}

searchInputElem.addEventListener('keydown',searchWikipedia);