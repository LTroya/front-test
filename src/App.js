import React, {Component} from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import moment from 'moment';
import {holidayApi} from './lib/HolidayApi';
import {formatDate, holidaysToArray} from './lib/utils';
import {Holidays} from './components/Holidays';

class App extends Component {
    state = {
        begin_date: '',
        end_date: '',
        disabled_dates: [],
        holidays: '',
        min: '',
        max: '',
        number_days: '',
        country_code: '',
        submitted: false,
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

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            error: '',
            message: 'Fetching holidays',
            end_date: moment(this.state.begin_date).add(this.state.number_days, 'day')
        });

        this.fetchHolidays();
    };

    handleEmptySubmit = (event) => {
        event.preventDefault();

        this.setState({
            error: 'Please fill the form correctly before continue',
        });
    };

    someFieldMissing = () => {
        return !this.state.begin_date
            || !this.state.number_days
            || !this.state.country_code;
    };

    fetchHolidays() {
        const params = {
            year: this.state.begin_date.get('year'),
            country: this.state.country_code,
        };

        holidayApi.fetch(params).then(response => {
            // Because I am only interested on the date, I can iterate
            // through each object's key and convert them into a Date's object
            // Format received: {2017-02-01: {date, name, observed}}
            const disabled_dates = Object.keys(response.data.holidays).map(formatDate);

            const holidays = holidaysToArray(response.data.holidays);

            this.setState({
                message: '',
                holidays,
                disabled_dates,
                max: new Date(this.state.end_date),
                min: new Date(this.state.begin_date),
                submitted: true,
            });
        }).catch(err => {
            this.setState({
                error: 'Error fetching holidays, please try again!',
                message: '',
                holidays: ''
            })
        });
    }

    render() {
        const handleSubmit = this.someFieldMissing() ? this.handleEmptySubmit : this.handleSubmit;

        return (
            <div className="App">
                {this.state.error && <p className="error">{this.state.error}</p>}
                {this.state.message && <p className="info">{this.state.message}</p>}

                <form onSubmit={handleSubmit}>
                    <DatePicker
                        dateFormat="DD/MM/YYYY"
                        placeholderText="Start date"
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
                        minDate={this.state.min}
                        min={this.state.min}
                        max={this.state.max}
                        maxDate={this.state.max}
                        disabledDates={this.state.disabled_dates}
                    />,
                </section>}

                {this.state.holidays && <Holidays holidays={this.state.holidays} />}
            </div>
        );
    }
}

export default App;
