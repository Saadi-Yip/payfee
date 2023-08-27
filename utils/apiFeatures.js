const { Op } = require('sequelize');

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    let excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);
    
    // Advance Filtering
    let whereCondition = {};
    Object.keys(queryObj).forEach((key) => {
      whereCondition[key] = {
        [Op.like]: `%${queryObj[key]}%`,
      };
    });
  
    this.query = this.query.findAll({
      where: whereCondition,
    });
  
    return this.query.then((results) => {
      this.query = results; // Update the query with the results
      return this;
    });
  }
  
  
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').map((field) => {
        const sortOrder = field.startsWith('-') ? 'DESC' : 'ASC';
        const fieldName = field.replace(/^-/, '');
        return `${fieldName} ${sortOrder}`;
      });
      this.query = this.query.orderBy(sortBy);
    } else {
      this.query = this.query.orderBy('createdAt ASC');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').map((field) => field.trim());
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const offset = (page - 1) * limit;
    this.query = this.query.findAndCount({ offset, limit, raw: true });
    return this;
  }
  
  
  
}

module.exports = ApiFeatures;
