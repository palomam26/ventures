function calculation(operation, left, right) {
    switch (operation) {
      case 'multiplication':
        return left * right;
      case 'division':
        return left / right;
      case 'addition':
        return left + right;
      case 'subtraction':
        return left - right;
      case 'remainder':
        return left % right;
      default:
        throw new Error('Unknown operation');
    }
  }
  
  module.exports = calculation;