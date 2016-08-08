import React from "react";
import Listing from "./Listing";

class FilterableContent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			listings: this.props.listings,
			search: '',
			checkboxes: []
		};

		//event bindings
		this.updateCheckboxes = this.updateCheckboxes.bind(this);
		this.filterBySearch = this.filterBySearch.bind(this);
		this.filterByMediaType = this.filterByMediaType.bind(this);
		this.updateSearchField = this.updateSearchField.bind(this);
		this.clearFilters = this.clearFilters.bind(this);
	}
	componentWillReceiveProps(nextProps){
		nextProps.listings.sort((a,b) => { //sort media listings by title
			if (a.title < b.title){
				return -1;
			}
			if (a.title > b.title){
				return 1;
			}
			return 0;
		});
		this.setState({
			listings: nextProps.listings,
			genres: nextProps.genres.map((single) => {	
						return <label key={single}><input type="checkbox" name="genre" value={single} onChange={this.updateCheckboxes} /> {single}</label>
					}),
			years: nextProps.years.map((single) => {	
						return <label key={single}><input type="checkbox" name="year" value={single} onChange={this.updateCheckboxes} /> {single}</label>
					})	
		});
	}
	updateSearchField(event){
		this.setState({
			search: event.target.value
		});
	}
	updateCheckboxes(event){
		if(event.target.checked){
			this.state.checkboxes.push(event.target.value)
		}else{
			let index = this.state.checkboxes.indexOf(event.target.value);
			this.state.checkboxes.splice(index, 1);
		}
		this.filterByCheckboxes();
	}
	filterByCheckboxes(event){
		if(this.state.checkboxes.length < 1){
			this.setState({
				listings: this.props.listings //if user unchecks every box, return to default state
			});
			return;
		}
		let filtered, i, total = [];
		for(i = 0; i < this.state.checkboxes.length; i++){
			filtered = this.props.listings.filter(
			    (single) => {
					return 	single.genre.includes(this.state.checkboxes[i]) ||
							single.year.includes(this.state.checkboxes[i]);
				}
			);
			total = total.concat(filtered);
		}
		total = Array.from(new Set(total)); //remove duplicates
		this.setState({
			listings: total
		});
	}
	filterByMediaType(event){
		let filtered = this.props.listings.filter(
		    (single) => {
				return single.type.includes(event.target.value);
			}
		);
		this.setState({
			listings: filtered
		});
	}
	filterBySearch(event){		
		if(event.keyCode === 13 || event.key === "Enter"){
			let filtered = this.props.listings.filter(
				(single) => {
					return single.title.toLowerCase().includes(event.target.value.toLowerCase());
				}
			);
			this.setState({
				listings: filtered
			});
		}else{
			return;
		}
	}
	clearFilters(event){
		event.preventDefault(); //stop it from jumping to the top of the page.
		this.setState({
			listings: this.props.listings
		});
	}
	render(){
		console.log(this.listings)
		return(
	        <section className="filterable-content">
				<div className="filters group">
					<div className="genres">
						<span className="dropdown">Genre</span>
						<div className="checkboxes">
							{this.state.genres}
						</div>
					</div>
					<div className="years">
						<span className="dropdown">Year</span>
						<div className="checkboxes">
							{this.state.years}
						</div>
					</div>
					<div className="search">
						<input type="text" value={this.state.search} onChange={this.updateSearchField} onKeyPress={this.filterBySearch} placeholder="Press Enter to search" />
					</div>
				</div>
				<div className="filters group">
					<div className="radio">
						<input type="radio" name="choice" value="movie" onClick={this.filterByMediaType} />
						<label>Movies</label>
					</div>
					<div className="radio">
						<input type="radio" name="choice" value="book" onClick={this.filterByMediaType} />
						<label>Books</label>
					</div>
					<div className="clear">
						<a href="#" onClick={this.clearFilters}>Clear filters</a>
					</div>
				</div>
				<div className="results">
					<ul>
					{
						this.state.listings.map((single) => {
							return <Listing item={single} key={single.title} />
						})
					}
					</ul>
				</div>
			</section>
		)
	}
}

export default FilterableContent;