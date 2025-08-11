# Python API

Below is a template for documenting public functions and classes.

## Example module: `your_package/math.py`
```python
def add(a: float, b: float) -> float:
    """Add two numbers.

    Args:
        a: First addend.
        b: Second addend.

    Returns:
        Sum of a and b.

    Examples:
        >>> add(2, 3)
        5
    """
    return a + b
```

### Documentation entry
- **Function**: `add(a: float, b: float) -> float`
- **Description**: Add two numbers and return the sum.
- **Parameters**: `a`, `b`
- **Returns**: `float`
- **Examples**:
  ```python
  from your_package.math import add
  print(add(2, 3))  # 5
  ```

## Auto-generation with pdoc (or Sphinx)
```bash
pip install pdoc
pdoc -o docs/api/py your_package
```

Alternatively, configure Sphinx with `sphinx.ext.autodoc` to generate richer documentation.