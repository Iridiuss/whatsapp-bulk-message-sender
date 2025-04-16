import pandas as pd
import os

# Create sample data with US phone numbers (adding country code 1)
data = {
    'phone_number': [
        '16307800560',
        '14087027765',
        '16503364606',
        '14086210017',
        '12149083091',
        '16507977042',
        '16508630619',
        '13018142180',
        '19256942607',
        '15104931200'
    ]
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to Excel in the current directory
output_path = os.path.join(os.path.dirname(__file__), 'sample_numbers.xlsx')
df.to_excel(output_path, index=False)
print(f"Sample Excel file '{output_path}' has been created successfully!") 