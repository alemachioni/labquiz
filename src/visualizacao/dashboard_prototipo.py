import streamlit as st
import pandas as pd
import numpy as np

st.title("Klabin Sustainability Dashboard")
st.markdown("Automated reporting from SAP Data Sphere")

factories = ['Monte Alegre', 'Ortigueira', 'Otacilio Costa', 'Correia Pinto', 'Goiana']
water_consumption = pd.DataFrame({
    'Month': pd.date_range('2024-01-01', periods=12,freq='M'),
    'Monte Alegre': np.random.uniform(3.0, 3.5, 12),
    'Ortigueira': np.random.uniform(3.0, 3.5, 12),
    'Goiana': np.random.uniform(3.0, 3.5, 12)
})
waste_recycling = pd.DataFrame({
    'Factory': factories,
    'Waste_Recycling_%': [99.8, 99.2, 99.5, 99.9, 99.1]
})
#print(water_consumption)

st.header("Key performance Indicators")
col1, col2, col3 = st.columns(3)
with col1:
    st.metric(
        label="Average Water Consumption",
        value="3.17 m³/ton",
        delta="-28.3% vs 2018",
        delta_color="inverse"
    )
with col2:
    st.metric(
        label="Waste Recycling Rate",
        value="99.35%",
        delta="+0.05% vs target"
    )
with col3:
    st.metric(
        label="CO₂ Avoided",
        value="2.95M tons",
        delta="+5.2% vs 2023"
    )
st.divider()

st.header("Water Consumption Trend")
st.markdown("Target: 3.50 m³/ton by 2030 | Current: 3.17m³/ton")
st.line_chart(water_consumption.set_index('Month'))
with st.expander("View Raw Data"):
    st.dataframe(water_consumption)

st.divider()

st.header("Waste Recycling by Factory")
st.markdown("Target:97.5% minimum | Company Average:99.35%")
st.bar_chart(waste_recycling.set_index('Factory'))
st.subheader("Factory Performance")
for _, row in waste_recycling.iterrows():
    if row['Waste_Recycling_%'] < 97.5:
        st.warning(f"⚠️{row['Factory']}: {row['Waste_Recycling_%']}% (BELOW TARGET)")
    else:
        st.success(f"{row['Factory']}: {row['Waste_Recycling_%']}%")

st.divider()

st.header("Factory Comparison")
selected_factory = st.selectbox("Select Factory", factories)
st.subheader(f"{selected_factory}")
st.info("Water: 3.2 m³/ton | Waste Recycling: 99.5%")
st.divider()
st.caption("Data source: SAP Data Sphere | Last updated: March 1, 2026")