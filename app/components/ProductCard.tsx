import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ProductType } from '../types/Product';

export default function ProductCard({ product }: { product: ProductType }) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                maxHeight: 460,
                borderRadius: 3,
                boxShadow: 6,
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 12,
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardMedia
                sx={{
                    height: 180,
                    objectFit: 'contain',
                    backgroundSize: 'contain',
                    p: 2,
                }}
                image={product.image}
                title={product.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    noWrap
                    sx={{ fontWeight: 'bold' }}
                >
                    {product.title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {product.description}
                </Typography>
                <div className="flex justify-between items-center">
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, "&:hover": { cursor: 'pointer' } }}>
                        ${product.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', "&:hover": { cursor: 'pointer' } }}>
                        {product.category}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
