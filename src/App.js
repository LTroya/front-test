import React, {Component} from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import moment from 'moment';

class App extends Component {
    state = {
        begin_date: '',
        number_days: '',
        country_code: '',
        submitted: false
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            submitted: true
        })
    };

    update = () => {
        this.setState({
            number_days: this.refs.number_days.value,
            country_code: this.refs.country_code.value,
        });
    };

    updateDate = (date) => {
        this.setState({
            begin_date: date,
        });
    };

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <DatePicker
                        dateFormat="DD/MM/YYYY"
                        placeholder="Start date"
                        selected={this.state.begin_date}
                        onChange={this.updateDate}/>

                    <input
                        type="number"
                        ref="number_days"
                        placeholder="Number of days"
                        onChange={this.update}/>

                    <input
                        type="text"
                        ref="country_code"
                        placeholder="Country code"
                        onChange={this.update}/>

                    <button>Submit</button>
                </form>

                {this.state.submitted && <section>
                    <InfiniteCalendar
                        width={400}
                        height={600}
                        selected={this.state.begin_date}
                        disabledDays={[0, 6]} // Disable weekends
                    />,
                </section>}
            </div>
        );
    }
}

export default App;
