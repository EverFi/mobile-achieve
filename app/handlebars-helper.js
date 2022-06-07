/* jshint ignore:start */

const LocaleService = require('services/loader-handler-services/locale-service');

module.exports = (function () {
  Handlebars.registerHelper('increment', increment);
  Handlebars.registerHelper('math', math);
  Handlebars.registerHelper('concat', concat);

  function increment(elem) {
    return parseInt(elem) + 1;
  }

  function math(lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
      '+': lvalue + rvalue,
      '-': lvalue - rvalue,
      '*': lvalue * rvalue,
      '/': lvalue / rvalue,
      '%': lvalue % rvalue,
    }[operator];
  }

  function concat(arg1, arg2) {
    return arg1.concat(arg2.toString());
  }

  Handlebars.registerHelper('times', function (n, block) {
    let accum = '';
    for (let i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
  });

  /*
   * Fin-lit course-level helpers
   */

  Handlebars.registerHelper({
    /*
     * Return part of a date
     */
    datePart(unit, dateStr) {
      const args = _.take(arguments, arguments.length - 1);
      unit = _.get(args, 0, 'string');
      dateStr = _.get(args, 1, undefined);

      const date = dateStr ? new Date(dateStr) : new Date();

      if (unit === 'string') {
        return date.toString();
      } else if (unit === 'shortYear') {
        return date.getFullYear().toString().substr(-2);
      } else {
        const methodName = 'get' + unit.charAt(0).toUpperCase() + unit.slice(1);
        const dateMethod = date[methodName];
        return typeof dateMethod === 'function' ? dateMethod.call(date) : null;
      }
    },

    /*
     * Format a number as currency (with decimal places and thousands separator)
     */
    formatCurrency(amount, decimalCount, thousandsSeparator) {
      const args = _.take(arguments, arguments.length - 1);
      amount = _.get(args, 0);
      decimalCount = _.get(args, 1, 2);
      thousandsSeparator = _.get(args, 2, ',');

      if (amount == null) {
        return;
      }

      return _.toNumber(amount)
        .toFixed(decimalCount)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandsSeparator}`);
    },

    /*
     * Pass data into locale string for interpolation
     *
     * Example:
     *   - "moduleLessonLengthMinutes": "{{minutes}} minutes"
     *   - `const time = 5`
     *   - {{td 'moduleLessonLengthMinutes' minutes=time}}
     *   => "5 minutes"
     */
    td(key, options) {
      return new Handlebars.SafeString(LocaleService.t(key, options.hash));
    },

    /**
     * Load an object from the LocaleService containing glossary terms,
     * sort its contents into an array, and group them by first symbol.
     *
     * @param {string} key - The locale key containing the glossary object.
     *   The object should match the following format:
     *   {
     *     "[entryKey]": {
     *       "term": "My localized term header",
     *       "definition": "My localized term definition."
     *     },
     *     ...
     *   }
     *
     * @returns {object} An object where keys are first letters and values are
     *   sorted arrays.
     */
    getLocaleGlossaryData(key) {
      // Load locale data into array with full data for each entry and sort
      // data by locale-aware sort
      const baseData = _.map(LocaleService.t(key, { returnObjects: true }), (value, key) =>
        _.assign({ key }, value)
      ).sort((a, b) => {
        const termA = _.get(a, 'term', '');
        const termB = _.get(b, 'term', '');
        return termA.localeCompare(termB, LocaleService.getLanguage(), {
          numeric: true,
        });
      });

      // Group glossary data by first character
      const groupedData = _.transform(
        baseData,
        (result, value) => {
          // Get unaccented base upper-case form of first letter
          const first = _.deburr(_.get(value, 'term', '').trim().substring(0, 1)).toUpperCase();
          const letter = first.match(/[A-Z]/) ? first : '#';
          result[letter] = result[letter] || [];
          result[letter].push(value);
        },
        {}
      );

      return groupedData;
    },
  });
})();

/* jshint ignore:end */
