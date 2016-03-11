import React from 'react';

export default class Dropdown extends React.Component {
    constructor() {
        super();
        this.change = this.change.bind( this );
        this.toggle = this.toggle.bind( this );
        this.state = {
            open: false,
            label: ''
        };
    }
    change( option ) {
        this.setState({
            label: option,
            open: !this.state.open
        });
        this.props.on_change( option );
    }
    toggle() {
        this.setState({
            open: !this.state.open 
        });
    }
    componentDidMount() {
        this.setState({
            label: this.props.selected_option
        });
    }
    render() {
        var className = this.state.open ? 'dropdown dropdown--is_open' : 'dropdown';
        var options = null;
        if ( this.props.options ) {
            var options = this.props.options.map( function( option, i ) {
                return (
                    <div className="dropdown__option"
                        onClick={this.change.bind( null, option )}
                        key={i}>{option}
                    </div>
                );
            }.bind( this ));
        }
        return (
            <div className="dropdown__wrapper">
                <div className={className} id={this.props.id}>
                    <div className="dropdown__label" onClick={this.toggle}>
                            {this.props.label} <b>{this.state.label}</b>
                    </div>
                    <div className="dropdown__contents">
                        {options}
                    </div>
                </div>
            </div>
        );
    }
}